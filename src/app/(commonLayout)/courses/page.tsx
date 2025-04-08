import AnimatedButton from "@/components/ui/AnimateButton";
import Container from "@/components/ui/Container";

const CoursePage = () => {
  return (
    <Container>
      <h1>This is Course Page</h1>
      <button className="relative inline-block w-32 h-11 leading-10 text-[#560bad] border-2 border-[#560bad] rounded-md font-medium overflow-hidden transition-colors duration-500 hover:text-white group z-10">
        Hover me
        <span className="absolute top-full left-full w-[200px] h-[150px] bg-[#560bad] rounded-full -z-10 transition-all duration-700 group-hover:top-[-30px] group-hover:left-[-30px] group-active:bg-[#3a0ca3]" />
      </button>

      <AnimatedButton className="w-auto  px-2 h-auto text-white hover:text-white">
        Hover
      </AnimatedButton>
    </Container>
  );
};

export default CoursePage;
