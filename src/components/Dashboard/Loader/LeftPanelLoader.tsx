import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import styles from "./Loader.module.css";
import { useRef, useEffect, useState } from "react";
import FadeInMotion from "../../motion/fadeInMotion";

/**
 * Skeleton loader for the left panel that takes full width and height
 * Uses dynamic viewBox to adapt to container dimensions
 */
const LeftPanelLoader = (props: IContentLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a more conservative initial height
  const [dimensions, setDimensions] = useState({ width: 446, height: 400 });

  // Measure container and update dimensions
  useEffect(() => {
    if (!containerRef.current) return;

    // Force initial measurement after a slight delay to ensure container has rendered
    setTimeout(() => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        if (offsetWidth > 0 && offsetHeight > 0) {
          setDimensions({
            width: offsetWidth,
            height: Math.min(offsetHeight, window.innerHeight * 0.6), // Limit max height
          });
        }
      }
    }, 50);

    // Set up resize observer to update on container size changes
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        if (offsetWidth > 0 && offsetHeight > 0) {
          setDimensions({
            width: offsetWidth,
            height: Math.min(offsetHeight, window.innerHeight * 0.6), // Limit max height
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    // Also listen for window resize events
    window.addEventListener("resize", updateDimensions);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <FadeInMotion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.loaderContainer} ref={containerRef}>
        <ContentLoader
          speed={1}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          backgroundColor="#1A1B1F"
          foregroundColor="#32353B"
          animate={true}
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "100%",
          }}
          preserveAspectRatio="none"
          {...props}
        >
          {/* Panel divider line - adjusted to container width */}
          <path
            d={`M 3 ${dimensions.height * 0.12} h ${dimensions.width - 6}`}
          />

          {/* Search area - scaled proportionally */}
          <rect
            x="0"
            y={dimensions.height * 0.04}
            rx="10"
            ry="10"
            width={dimensions.width * 0.63}
            height={dimensions.height * 0.05}
          />

          {/* Top section items - scaled proportionally */}
          <rect
            x="5"
            y={dimensions.height * 0.18}
            rx="10"
            ry="10"
            width={dimensions.width * 0.63}
            height={dimensions.height * 0.05}
          />
          <rect
            x="0"
            y="0"
            rx="10"
            ry="10"
            width={dimensions.width * 0.63}
            height={dimensions.height * 0.03}
          />
          <rect
            x="5"
            y={dimensions.height * 0.24}
            rx="10"
            ry="10"
            width={dimensions.width * 0.63}
            height={dimensions.height * 0.08}
          />

          {/* Main content area - scaled to fit container */}
          <rect
            x="5"
            y={dimensions.height * 0.37}
            rx="10"
            ry="10"
            width={dimensions.width - 10}
            height={dimensions.height * 0.63}
          />
        </ContentLoader>
      </div>
    </FadeInMotion>
  );
};

export default LeftPanelLoader;
