import * as React from "react";
import type { UseFormReset } from "react-hook-form";
import { defaultValues } from "./page";
import type { FormValues } from "./page";

export default ({ reset }: { reset: UseFormReset<FormValues> }) => (
  <>
    <button
      className="button buttonBlack"
      type="button"
      onClick={() => {
        reset(defaultValues);
      }}
    >
      Reset Form
    </button>
  </>
);
