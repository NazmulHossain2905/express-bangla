// ts-middleware পাঠে দেখানো Request এক্সটেনশনের টাইপ
export interface AuthUser {
  id: number;
  email: string;
  role: "admin" | "editor" | "reader";
}
