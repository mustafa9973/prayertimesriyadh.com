import { useState } from "react";

export default  function toggleIcon(index: number) {

    const [currentlyExpanded, setCurrentlyExpanded] = useState<any>(null);
    if (currentlyExpanded != null && currentlyExpanded != index) {
      const c = document.getElementById(`q${currentlyExpanded}`) as any;
      c.checked = false;
      document
        .getElementById(`icon${currentlyExpanded}`)
        ?.classList.add("rotate-180");
    }
    const checkbox = document.getElementById(`q${index}`) as any;
    const icon = document.getElementById(`icon${index}`);
    if (checkbox?.checked) {
      icon?.classList.remove("rotate-180");
    } else {
      icon?.classList.add("rotate-180");
    }
    setCurrentlyExpanded(index);

    return null;
}