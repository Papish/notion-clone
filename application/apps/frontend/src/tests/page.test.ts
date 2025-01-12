import useNode from "../hooks/node";
import { act, renderHook } from "@testing-library/react";

describe("Node", () => {
  test("init", () => {
    const { result } = renderHook(() => useNode());
    expect(result.current.data.length).toBe(0);
  });

  test("can add new node", () => {
    const { result } = renderHook(() => useNode());
    const { current } = result;
    act(() => {
      current.addNode();
    });
    expect(result.current.data.length).toBe(1);
  });
});
