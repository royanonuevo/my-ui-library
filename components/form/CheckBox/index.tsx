import { cn } from '@/lib/utils'
import ErrorText from '../ui/ErrorText'
import Field from '../ui/Field'

type CheckboxProps = {
 label?: string,
 value: boolean,
 onChange: any,
 onBlur?: any,
 error?: string | boolean,
 styleLabel?: React.CSSProperties
 disabled?: boolean
}

const CheckBox = ({
 label = '',
 value,
 onChange,
 onBlur,
 error = '',
 styleLabel,
 disabled = false
}: CheckboxProps) => { 
 const hasError = error? true : false

 const handleTick = () => {
  onChange(!value)
 }

 const handleBlur = (e: React.FocusEvent) => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    onBlur && onBlur()
  }
}

 return (
   <div>
     <div
       className='grid grid-cols-[auto_1fr] gap-3 items-start relative cursor-pointer'
     >
       <Field 
         disabled={disabled}
         hasError={hasError}
         tabIndex={0}
         onBlur={handleBlur}
         className={cn({
           'h-[20px] w-[20px] flex items-center justify-center rounded mt-[2px]': true,
           'after:content-[""] after:w-[6px] after:h-[13px]': true,
           'after:hidden after:rotate-45 after:-mt-[3px] after:border-t-0 after:border-r-[3px] after:border-b-[3px] after:border-l-0': true,
           'after:block bg-primary border-primary after:border-white': value === true,
           'bg-app-disabled-inputs border-app-disabled-inputs after:border-primary': value === true && disabled
         })} 
         onClick={handleTick}
       />

       <span  onClick={handleTick} className='peer-disabled:cursor-not-allowed mt-[3px]' style={styleLabel}>{ label }</span>
     </div>

   
     { hasError && (<ErrorText>{ error }</ErrorText>) }
   </div>
 )
}

export default CheckBox