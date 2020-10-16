import type { JSXComponentProps } from "@/types/react";
import { memo } from "react";

type Props = JSXComponentProps<"div">;

function FormError({ style, ...props }: Props) {
  return <div style={{ color: "red", ...style }} {...props} />;
}

export default memo(FormError);
