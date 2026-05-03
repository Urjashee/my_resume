import { motion } from "framer-motion"
import { Search, PenTool, ShieldCheck, RefreshCcw, ArrowRight } from "lucide-react"

const nodes = [
  { id: "input", label: "Query Input", icon: Search, color: "bg-blue-500" },
  { id: "researcher", label: "Researcher Agent", icon: Search, color: "bg-primary" },
  { id: "critic", label: "Critic Agent", icon: ShieldCheck, color: "bg-orange-500" },
  { id: "writer", label: "Writer Agent", icon: PenTool, color: "bg-green-500" },
  { id: "output", label: "Final Report", icon: ShieldCheck, color: "bg-purple-500" },
]

export function GraphVisualizer() {
  return (
    <div className="relative w-full py-12 px-4 bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Agentic Workflow Architecture</h4>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          {/* Input Node */}
          <NodeItem node={nodes[0]} />
          <Connector />
          
          {/* Researcher Node */}
          <div className="relative">
            <NodeItem node={nodes[1]} />
            {/* Self-Correction Loop Arrow */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 text-orange-500"
            >
              <RefreshCcw className="w-5 h-5" />
            </motion.div>
          </div>
          
          <Connector />
          
          {/* Critic Node */}
          <NodeItem node={nodes[2]} />
          
          <Connector />
          
          {/* Writer Node */}
          <NodeItem node={nodes[3]} />
          
          <Connector />
          
          {/* Output Node */}
          <NodeItem node={nodes[4]} />
        </div>

        {/* Legend / Caption */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground max-w-md mx-auto bg-black/20 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>StateGraph Nodes (Agents)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Conditional Edges (Validation)</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-3 h-3 text-orange-500" />
            <span>Cyclic Correction Loop</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-3 h-3 text-primary" />
            <span>Shared State Persistence</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NodeItem({ node }) {
  const Icon = node.icon
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2"
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${node.color} flex items-center justify-center shadow-lg shadow-${node.color.split('-')[1]}-500/20 border border-white/20 relative group`}>
        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </div>
      <span className="text-[10px] sm:text-xs font-medium text-foreground/80 text-center max-w-[80px] leading-tight">
        {node.label}
      </span>
    </motion.div>
  )
}

function Connector() {
  return (
    <div className="hidden sm:flex items-center text-white/20">
      <motion.div
        animate={{ x: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </div>
  )
}
