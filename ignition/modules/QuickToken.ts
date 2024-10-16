import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const QuickToken = buildModule("QuickToken", (m) => {
  const name = m.getParameter("name", "qToken");
  const symbol = m.getParameter("symbol", "qT");
  const quickToken = m.contract("QuickToken", [name, symbol]);
  return { quickToken };
});

export default QuickToken;
