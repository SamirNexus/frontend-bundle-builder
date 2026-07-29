import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Counter from "./Counter";

describe("Counter", () => {
  it("disables decrement at zero and calls increment", async () => {
    const user = userEvent.setup();
    const onIncrease = vi.fn();

    render(
      <Counter
        value={0}
        onIncrease={onIncrease}
        onDecrease={vi.fn()}
        ariaLabel="Camera quantity"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Decrease camera quantity",
      }),
    ).toBeDisabled();

    await user.click(
      screen.getByRole("button", {
        name: "Increase camera quantity",
      }),
    );

    expect(onIncrease).toHaveBeenCalledOnce();
  });
});
