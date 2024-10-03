import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const QuickToken = buildModule("QuickToken", (m) => {
  const name = m.getParameter("name", "QuickToken");
  const symbol = m.getParameter("symbol", "QT");
  
  const quickToken = m.contract("QuickToken", [name, symbol]);
  return { quickToken };
});

export default QuickToken;
