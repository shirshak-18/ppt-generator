import pptxgen from "pptxgenjs";

export const generateTestPPT = () => {
  // Create new presentation
  const pres = new pptxgen();
  
  // Add a slide
  const slide = pres.addSlide();
  
  // Add text to slide
  slide.addText("Hello World from PPT Generator!", {
    x: 1,
    y: 1,
    color: "363636",
    fontSize: 24
  });
  
  // Save the presentation
  pres.writeFile({ fileName: "test-presentation.pptx" });
};
