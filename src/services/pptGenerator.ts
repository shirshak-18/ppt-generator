import pptxgen from "pptxgenjs";
import type { SlideContent } from "./textParser";
import { getPrimaryColor } from "./templateEngine";

export function generatePPT(slides: SlideContent[], templateId: string = "blue") {
  const pres = new pptxgen();
  const primaryColor = getPrimaryColor(templateId);

  slides.forEach((slideData) => {
    const slide = pres.addSlide();

    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      bold: true,
      color: primaryColor,
    });

    if (slideData.content.length > 0) {
      slide.addText(slideData.content.join("\n"), {
        x: 0.75,
        y: 1.5,
        w: 8.5,
        h: 4,
        fontSize: 20,
        color: "363636",
        bullet: true,
      });
    }
  });

  return pres.writeFile({ fileName: "presentation.pptx" });
}
