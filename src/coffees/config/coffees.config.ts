import { registerAs } from "@nestjs/config";

// 通过 registerAs 注册命名空间
export default registerAs("coffees", () => ({
  foo: "bar",
}));
