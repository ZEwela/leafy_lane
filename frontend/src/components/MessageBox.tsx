import Alert from "react-bootstrap/Alert";
import React from "react";

function MessageBox({
  variant = "info",
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default MessageBox;
