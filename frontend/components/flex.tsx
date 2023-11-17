import { forwardRef, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
  //direction x
  x?: boolean;
  //direction y
  y?: boolean;
  //positionning x start
  xs?: boolean;
  //positionning x center
  xc?: boolean;
  //positionning x end
  xe?: boolean;
  //positionning y start
  ys?: boolean;
  //positionning y center
  yc?: boolean;
  //positionning y end
  ye?: boolean;
  //positionning x space-between
  xsb?: boolean;
  //positionning y space-between
  ysb?: boolean;

  xsa?: boolean;
  ysa?: boolean;

  gap?: number;
  gap1?: boolean;
  gap2?: boolean;
  gap3?: boolean;

  wrap?: boolean;
  grow?: boolean;
  loading?: boolean;
  fullwidth?: boolean;
  basis?: string;
  style?: any;
  onClick?: () => void;
}

const DEFAULT_GAP = 8;

const Flex = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      x,
      y,
      xs,
      xc,
      xe,
      ys,
      yc,
      ye,
      xsb,
      ysb,
      gap,
      gap1,
      gap2,
      gap3,
      xsa,
      ysa,
      fullwidth,
      wrap,
      grow,
      loading,
      basis,
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    const innerStyle: any = { display: "flex" };
    if (x) innerStyle.flexDirection = "row";
    if (y) innerStyle.flexDirection = "column";
    if (xs) innerStyle[x ? "justifyContent" : "alignItems"] = "flex-start";
    if (xc) innerStyle[x ? "justifyContent" : "alignItems"] = "center";
    if (xe) innerStyle[x ? "justifyContent" : "alignItems"] = "flex-end";
    if (xsb) innerStyle[x ? "justifyContent" : "alignItems"] = "space-between";
    if (xsa) innerStyle[x ? "justifyContent" : "alignItems"] = "space-around";

    if (ys) innerStyle[y ? "justifyContent" : "alignItems"] = "flex-start";
    if (yc) innerStyle[y ? "justifyContent" : "alignItems"] = "center";
    if (ye) innerStyle[y ? "justifyContent" : "alignItems"] = "flex-end";
    if (ysb) innerStyle[y ? "justifyContent" : "alignItems"] = "space-between";
    if (ysa) innerStyle[y ? "justifyContent" : "alignItems"] = "space-around";

    if (gap1) {
      innerStyle.columnGap = `${DEFAULT_GAP * 1}px`;
      innerStyle.rowGap = `${DEFAULT_GAP * 1}px`;
    }

    if (gap2) {
      innerStyle.columnGap = `${DEFAULT_GAP * 2}px`;
      innerStyle.rowGap = `${DEFAULT_GAP * 2}px`;
    }

    if (gap3) {
      innerStyle.columnGap = `${DEFAULT_GAP * 3}px`;
      innerStyle.rowGap = `${DEFAULT_GAP * 3}px`;
    }

    if (gap) {
      innerStyle.columnGap = `${DEFAULT_GAP * gap}px`;
      innerStyle.rowGap = `${DEFAULT_GAP * gap}px`;
    }

    if (fullwidth) {
      innerStyle.width = "100%";
    }

    if (wrap) {
      innerStyle.flexWrap = "wrap";
    }

    if (grow) {
      innerStyle.flexGrow = 1;
    }

    if (basis) {
      innerStyle.flexBasis = basis;
    }

    return (
      <div ref={ref} {...rest} style={{ ...innerStyle, ...style }} onClick={onClick}>
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
export { Flex };
