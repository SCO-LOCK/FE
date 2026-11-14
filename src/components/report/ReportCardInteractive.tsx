import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import copyIcon from '../../assets/icons/copy-icon.svg'; 
import ReportCardItem from './ReportCardItem';         

interface ReportCardInteractiveProps extends ComponentPropsWithoutRef<'button'> {
  title: string;
  content: string;
}

export default function ReportCardInteractive({ title, content, type = 'button', className = '', onClick, ...rest }: ReportCardInteractiveProps) {
    const handleClick = async(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        try {
            await
            navigator.clipboard.writeText(content);
        } catch (error) {
            console.error('질문 복사에 실패했어요.', error);
        }
    };
  return (
    <button type={type} onClick={handleClick} className={`group w-full transition-all duration-100
      hover:p-[var(--padding-xsmall)] active:p-[var(--padding-xsmall)] ${className}`} {...rest}>

      <span className="flex items-center gap-[var(--gap-small)] rounded-[var(--radius-small)]
        bg-bg-interactive-weak py-[var(--padding-xlarge)] pr-[var(--padding-xlarge)] pl-[var(--padding-2xlarge)]
        transition-all duration-100
        group-hover:gap-[var(--gap-xsmall)] group-hover:py-[var(--padding-large)]
        group-active:gap-[var(--gap-xsmall)] group-active:py-[var(--padding-large)]
        group-active:bg-bg-interactive-weak-pressed">

        <ReportCardItem title={title} content={content} />
        <img src={copyIcon} alt="" className="size-6 shrink-0" />  
        <span className="sr-only">복사하기</span>  
      </span>  
    </button>
  );
}