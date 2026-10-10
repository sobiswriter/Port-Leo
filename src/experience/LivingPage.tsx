import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { StillContext } from './RoomParts';
export function LivingPage({children, still}: {children: React.ReactNode; still: boolean}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || still) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('has-arrived'); observer.unobserve(entry.target);}
    }), {threshold: 0.08});
    const observe = () => element.querySelectorAll('section, article, .next-place, .journey-moment').forEach((target, index) => {
      if (target.hasAttribute('data-reveal')) return;
      target.setAttribute('data-reveal', '');
      (target as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
      observer.observe(target);
    });
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(element, {childList: true, subtree: true});
    return () => {observer.disconnect(); mutations.disconnect();};
  }, [still]);
  return <StillContext.Provider value={still}><motion.div ref={root} className="living-page" initial={still ? false : {opacity:0, y:20, filter:'blur(5px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{duration:still ? 0 : 0.75,ease:[0.16,1,0.3,1]}}>{children}</motion.div></StillContext.Provider>;
}
