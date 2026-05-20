import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string | null;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function apiSuccess<T>(data: T, meta?: Record<string, unknown>, status = 200) {
  return NextResponse.json({ success: true, data, meta } as ApiSuccessResponse<T>, { status });
}

export function apiError(code: string, message: string, status = 400, field?: string | null) {
  return NextResponse.json(
    { success: false, error: { code, message, field } } as ApiErrorResponse,
    { status }
  );
}

export function apiValidationError(error: ZodError) {
  const firstIssue = error.issues[0];
  return apiError(
    "VALIDATION_ERROR",
    firstIssue.message,
    400,
    firstIssue.path.join(".")
  );
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export function paginationMeta(total: number, page: number, perPage: number): PaginationMeta {
  return {
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
  };
}

export async function validateBody<T>(request: Request, schema: { parse: (data: unknown) => T }): Promise<T | NextResponse> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiValidationError(error);
    }
    return apiError("INVALID_JSON", "Request body is not valid JSON", 400);
  }
}
