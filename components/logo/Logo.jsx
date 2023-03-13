import Link from "next/link";
import React from "react";

function Logo({ color }) {
  return (
    <Link href="/" className={`logo`}>
      <span className={`logo__one ${color}`}> moz </span>
      <span className={`logo__two ${color}`}> market </span>
    </Link>
  );
}

export default Logo;
