import styles from "./miscellaneous.module.css"
import { useReducer } from "react"

export function Accordion({title, children, defaultOpen = false}){
  const [ isAccordionOpen, toggleAccordion ] = useReducer(state=>!state, defaultOpen )
  return (
    <article className={`${styles.accordion} radius-md pd-sm flex-col`}>
      <div onClick={toggleAccordion} className={`${styles.accordionHeader} d-flex align-i-center justify-c-space-between`}>
        <h3 className="txt-semibold">
          {title}
        </h3>
        <span style={{
          transform:isAccordionOpen ? "rotate(180deg)" : "rotate(0deg)"
        }} className="fas fa-caret-down"></span>
      </div>
        {/* <hr/> */}
      <div className={`${styles.accordionContent} ${isAccordionOpen && styles.activeAccordian}`}>
        {children}
      </div>
    </article>
  )
}