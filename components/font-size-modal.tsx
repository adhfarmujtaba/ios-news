"use client"

import { Check } from "lucide-react"

interface FontSizeModalProps {
  currentSize: number
  onSelect: (size: number) => void
  onClose: () => void
}

export function FontSizeModal({ currentSize, onSelect, onClose }: FontSizeModalProps) {
  const fontSizes = [
    { value: 1, label: "Small" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Large" },
  ]

  return (
    <div className="ios-modal-backdrop" onClick={onClose}>
      <div className="ios-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ios-modal-header">
          <div className="ios-modal-title">Font Size</div>
          <button className="ios-modal-close" onClick={onClose}>
            Done
          </button>
        </div>
        <div className="ios-modal-content">
          <div className="ios-option-list">
            {fontSizes.map((size) => (
              <div key={size.value} className="ios-option-item" onClick={() => onSelect(size.value)}>
                <span className="ios-option-label">{size.label}</span>
                {currentSize === size.value && <Check className="ios-option-check h-5 w-5" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

