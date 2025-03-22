'use client';

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

const TestScroll = () => {
  return (
    <ScrollAreaPrimitive.Root>
      <ScrollAreaPrimitive.Viewport>
        <div>Teste</div>
      </ScrollAreaPrimitive.Viewport>
    </ScrollAreaPrimitive.Root>
  )
}

export default TestScroll 