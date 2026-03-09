import { useState } from 'react'
import Label from '@atoms/Label'
import Heading from '@atoms/Heading'
import AccordionItem from '@molecules/AccordionItem'
import './FaqSection.css'

const FAQS = [
  {
    question: 'How long will my project take?',
    answer: 'Project timelines vary depending on scope and complexity. A typical bathroom renovation might take 2-3 weeks, while a full home refurbishment could take 3-6 months. We provide detailed timelines before starting any work.'
  },
  {
    question: 'Do you handle all aspects of the renovation?',
    answer: 'Yes, we offer a full-service approach. We manage everything from initial design and planning permissions to construction, plumbing, electrical work, and final finishes, coordinating all trades for you.'
  },
  {
    question: 'How do you ensure minimal disruption to my home or business?',
    answer: 'We plan our work carefully to minimize impact. We use protective coverings, dust extraction systems, and maintain a tidy site daily. For commercial projects, we can arrange out-of-hours work to keep your business running smoothly.'
  }
]

/**
 * FaqSection organism - FAQ section with accordion
 */
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }
  
  return (
    <section className="faq-section section">
      <div className="container faq-section__container">
        <div className="faq-section__header">
          <Label>FAQ</Label>
          <Heading level={2} variant="section">
            Frequently Asked Questions
          </Heading>
        </div>
        
        <div className="faq-section__content">
          {FAQS.map((faq, index) => (
            <AccordionItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
