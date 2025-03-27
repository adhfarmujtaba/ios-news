"use client"

import { Check } from "lucide-react"

interface ViewOptionsModalProps {
  currentView: string
  onSelect: (view: string) => void
  onClose: () => void
}

export function ViewOptionsModal({ currentView, onSelect, onClose }: ViewOptionsModalProps) {
  const viewOptions = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ]

  const handleSelect = (view: string) => {
    onSelect(view)
    // Close modal after selection for better UX
    setTimeout(() => {
      onClose()
    }, 200)
  }

  return (
    <div className="ios-modal-backdrop" onClick={onClose}>
      <div className="ios-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ios-modal-header">
          <div className="ios-modal-title">Default View</div>
          <button className="ios-modal-close" onClick={onClose}>
            Done
          </button>
        </div>
        <div className="ios-modal-content">
          <div className="ios-option-list">
            {viewOptions.map((option) => (
              <div key={option.value} className="ios-option-item" onClick={() => handleSelect(option.value)}>
                <span className="ios-option-label">{option.label}</span>
                {currentView === option.value && <Check className="ios-option-check h-5 w-5" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

