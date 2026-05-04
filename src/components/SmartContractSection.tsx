import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TrustExchangeEscrow is ReentrancyGuard {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, DISPUTED }

    struct Trade {
        address buyer;
        address seller;
        address arbitrator;
        uint256 amount;
        State   state;
        uint256 deadline;
    }

    mapping(uint256 => Trade) public trades;
    uint256 public tradeCounter;
    IERC20  public immutable usdt;
    uint256 public constant FEE_BPS = 10; // 0.1%

    event TradeCreated(uint256 id, address buyer, address seller, uint256 amount);
    event FiatConfirmed(uint256 id);
    event TradeComplete(uint256 id);
    event DisputeRaised(uint256 id);

    constructor(address _usdt) { usdt = IERC20(_usdt); }

    function createTrade(address seller, uint256 amount, uint256 ttl)
        external nonReentrant returns (uint256 id)
    {
        require(usdt.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        id = tradeCounter++;
        trades[id] = Trade(msg.sender, seller, address(0), amount, State.AWAITING_DELIVERY, block.timestamp + ttl);
        emit TradeCreated(id, msg.sender, seller, amount);
    }

    function confirmFiatReceived(uint256 id) external nonReentrant {
        Trade storage t = trades[id];
        require(msg.sender == t.seller, "Not seller");
        require(t.state == State.AWAITING_DELIVERY, "Wrong state");
        uint256 fee = (t.amount * FEE_BPS) / 10_000;
        usdt.transfer(t.seller, t.amount - fee);
        t.state = State.COMPLETE;
        emit TradeComplete(id);
    }

    function raiseDispute(uint256 id) external {
        Trade storage t = trades[id];
        require(msg.sender == t.buyer || msg.sender == t.seller);
        t.state = State.DISPUTED;
        emit DisputeRaised(id);
    }
}`;

const highlights: Record<string, string> = {
  'ReentrancyGuard': '#06b6d4',
  'IERC20': '#f59e0b',
  'nonReentrant': '#10b981',
  'emit': '#ec4899',
  'mapping': '#8b5cf6',
  'require': '#f87171',
  'State': '#a78bfa',
};

const escrowSteps = [
  { icon: '🔐', label: 'Lock USDT', desc: 'Buyer deposits USDT into contract', color: '#8b5cf6' },
  { icon: '💸', label: 'Send Fiat', desc: 'Buyer sends fiat via agreed method', color: '#ec4899' },
  { icon: '✅', label: 'Confirm', desc: 'Seller confirms receipt on-chain', color: '#10b981' },
  { icon: '🚀', label: 'Release', desc: 'Contract auto-releases USDT to seller', color: '#06b6d4' },
];

function CodeLine({ line, idx }: { line: string; idx: number }) {
  let highlighted = line;
  const style: React.CSSProperties = { color: '#94a3b8' };

  if (line.trim().startsWith('//')) return (
    <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#4a5568' }}>{line}</div>
  );
  if (line.includes('pragma') || line.includes('import') || line.includes('SPDX')) return (
    <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#7c8b9f' }}>{line}</div>
  );
  if (line.includes('contract ') || line.includes('function ') || line.includes('constructor')) {
    return <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#a78bfa' }}>{line}</div>;
  }
  if (line.includes('event ')) {
    return <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#ec4899' }}>{line}</div>;
  }
  if (line.includes('mapping') || line.includes('uint256') || line.includes('address') || line.includes('bool') || line.includes('string')) {
    return <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#06b6d4' }}>{line}</div>;
  }
  if (line.includes('emit ')) {
    return <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#f59e0b' }}>{line}</div>;
  }
  if (line.includes('require') || line.includes('revert')) {
    return <div key={idx} className="font-mono text-xs leading-6 pl-2" style={{ color: '#f87171' }}>{line}</div>;
  }

  return <div key={idx} className="font-mono text-xs leading-6 pl-2" style={style}>{line}</div>;
}

export default function SmartContractSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);
  const lines = contractCode.split('\n');

  return (
    <section id="contract" className="relative py-28 overflow-hidden" ref={ref}>
      {/* BG */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-badge mb-5 inline-flex">SMART CONTRACT</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Code That<br />
            <span className="animated-gradient-text">Never Lies</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl">
            Every trade is governed by immutable Solidity — no middlemen, no trust required.
            Audited, gas-optimised, and deployed across all major EVM chains.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Code viewer */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0d1117', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3" style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-xs text-slate-500">TrustExchangeEscrow.sol</span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-cyan-400 font-mono">Solidity</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: '#10b98115', color: '#10b981', border: '1px solid #10b98130' }}>Audited ✓</span>
              </div>
            </div>

            {/* Code scroll */}
            <div className="overflow-auto max-h-[480px] p-4 scanner relative" style={{ scrollbarWidth: 'thin', scrollbarColor: '#7c3aed #0d1117' }}>
              <table className="w-full border-collapse">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="select-none text-slate-700 font-mono text-xs pr-4 text-right w-8 leading-6">{i + 1}</td>
                      <td><CodeLine line={line} idx={i} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-6 px-4 py-3 text-xs text-slate-500" style={{ background: '#161b22', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <span>📦 {lines.length} lines</span>
              <span>⚡ ~40% gas optimised</span>
              <span style={{ color: '#10b981' }}>🛡 OpenZeppelin v5</span>
            </div>
          </motion.div>

          {/* Right: Steps + badges */}
          <div className="flex flex-col gap-6">
            {/* Escrow flow */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card-3d rounded-2xl p-6"
            >
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span>⚡</span> Escrow State Machine
              </h3>
              <div className="space-y-3">
                {escrowSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background: activeStep === idx ? `${step.color}12` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${activeStep === idx ? step.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    }}
                    onClick={() => setActiveStep(idx)}
                    whileHover={{ x: 4 }}
                  >
                    {/* Connector line */}
                    {idx < escrowSteps.length - 1 && (
                      <div
                        className="absolute left-7 -bottom-3 w-px h-3 z-10"
                        style={{ background: `linear-gradient(180deg, ${step.color}60, transparent)` }}
                      />
                    )}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{step.label}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{step.desc}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${step.color}20`, color: step.color }}>
                      {idx + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Audit badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Reentrancy Guard', value: 'Protected', color: '#10b981', icon: '🔒' },
                { label: 'Overflow Safety', value: 'Solidity 0.8+', color: '#06b6d4', icon: '🛡' },
                { label: 'Access Control', value: 'Role-based', color: '#8b5cf6', icon: '🎭' },
                { label: 'Gas Usage', value: '~65k per trade', color: '#f59e0b', icon: '⚡' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl p-4 text-center"
                  style={{ background: `${badge.color}08`, border: `1px solid ${badge.color}25` }}
                  whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${badge.color}20` }}
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className="text-xs text-slate-400 mb-1">{badge.label}</div>
                  <div className="font-bold text-sm" style={{ color: badge.color }}>{badge.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
