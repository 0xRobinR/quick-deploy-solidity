import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const QuickToken = buildModule("QuickToken", (m) => {
  const quickToken = m.contract("QuickToken", []);
  return { quickToken };
});

export default QuickToken;
