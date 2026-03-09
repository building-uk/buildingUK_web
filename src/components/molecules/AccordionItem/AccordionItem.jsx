import { useState } from 'react'
import Heading from '@atoms/Heading'
import Text from '@atoms/Text'
import './AccordionItem.css'

/**
 * AccordionItem molecule - Collapsible content item
 * @param {Object} props
 * @param {string} props.question - The question/title
 * @param {string} props.answer - The answer/content
 * @param {boolean} props.isOpen - Controlled open state
 * @param {Function} props.onToggle - Handler for toggle
 */
function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}>
      <button 
        className="accordion-item__header" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Heading level={4} variant="default" className="accordion-item__title">
          {question}
        </Heading>
        <span className="accordion-item__icon">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      <div 
        className="accordion-item__content"
        style={{ maxHeight: isOpen ? '500px' : '0' }}
      >
        <div className="accordion-item__body">
          <Text size="base" color="dark">
            {answer}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
