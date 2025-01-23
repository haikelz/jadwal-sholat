
/**
 * A custom hook to handle is an element showed or not based on user's current and previous scroll
 * @export
 * @returns {boolean}
 */
/*export function useShowHide(): boolean {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY;
    setIsShow(
      prevScrollPosition > currentScrollPosition || currentScrollPosition < 60
    );

    setPrevScrollPosition(currentScrollPosition);
  }, [setIsShow, prevScrollPosition, setPrevScrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isShow;
}
*/
