import { useEffect, useRef, useState } from "react";
import { counterItems } from "../constants/index.js";

const Counter = ({ end, duration, trigger }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setValue(0); // reset when leaving view
      return;
    }

    let startTime;
    let frame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setValue(Math.floor(easeOut * end));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [trigger, end, duration]);

  return <span>{value}</span>;
};

const AnimatedCounter = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting); // TRUE when in view, FALSE when out
      },
      {
        threshold: 0.4,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const duration = 1200;

  return (
    <div ref={ref} id="counter" className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div className="counter-number text-white text-5xl font-bold mb-2">
              <Counter
                end={item.value}
                duration={duration}
                trigger={visible}
              />
              {item.suffix}
            </div>

            <div className="text-white-50 text-lg">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;