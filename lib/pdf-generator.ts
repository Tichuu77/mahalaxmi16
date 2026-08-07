import { jsPDF } from "jspdf"

interface ProjectDetails {
  title: string
  image: string
  description: string
  location: string
  status: string
}

export async function downloadBrochurePDF(project: ProjectDetails) {
  const doc = new jsPDF()

  // 1. Convert image to base64
  let base64Image = ""
  if (project.image) {
    try {
      let imageUrl = project.image
      if (imageUrl.startsWith("/")) {
        imageUrl = window.location.origin + imageUrl
      }
      const res = await fetch(imageUrl)
      const blob = await res.blob()
      base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (err) {
      console.error("Error loading project image for PDF brochure:", err)
    }
  }

  // 2. Setup colors
  const primaryColor = [48, 83, 74] // #30534A (Dark green)
  const goldColor = [201, 134, 43] // #C9862B (Gold)
  const darkGray = [51, 51, 51] // Text color

  // 3. Draw Header banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, 210, 38, "F")

  // Logo text
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.text("MAHALAXMI INFRA", 15, 20)

  // Subtitle
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2])
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.text("NAGPUR'S MOST TRUSTED DEVELOPER", 15, 27)

  // Web link in header right
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text("mahalaxmiinfranagpur.com", 195, 20, { align: "right" })

  // 4. Project Details Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFont("helvetica", "bold")
  doc.setFontSize(24)
  doc.text(project.title, 15, 54)

  // Location indicator
  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2])
  doc.text(`Location: ${project.location || "Nagpur"}`, 15, 61)

  // Divider Line
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2])
  doc.setLineWidth(0.6)
  doc.line(15, 65, 195, 65)

  // 5. Draw Project Image (centered)
  let nextY = 75
  if (base64Image) {
    try {
      // Draw frame border
      doc.setDrawColor(230, 230, 230)
      doc.setLineWidth(1)
      doc.rect(14.5, 74.5, 181, 101)

      // Determine standard image format extension
      let format = "JPEG"
      if (project.image.toLowerCase().endsWith(".png")) {
        format = "PNG"
      } else if (project.image.toLowerCase().endsWith(".webp")) {
        format = "WEBP"
      }

      doc.addImage(base64Image, format, 15, 75, 180, 100)
      nextY = 186
    } catch (e) {
      console.error("Failed to render project image in PDF:", e)
      nextY = 75
    }
  }

  // 6. Project Description
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  const descriptionText = project.description || "Premium plotted development project situated in a highly developing location in Nagpur. Offering excellent connectivity, sanctioned layouts, and an outstanding opportunity for investors and homebuyers alike."
  const splitDescription = doc.splitTextToSize(descriptionText, 180)
  doc.text(splitDescription, 15, nextY)
  
  const descHeight = splitDescription.length * 5.5
  nextY += descHeight + 10

  // 7. Highlights & Amenities Box
  doc.setFillColor(248, 250, 249)
  doc.rect(15, nextY, 180, 48, "F")
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setLineWidth(0.5)
  doc.rect(15, nextY, 180, 48)

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("CORE PROJECT HIGHLIGHTS", 20, nextY + 7)

  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  
  doc.text("- NIT / NMRDA Sanctioned & RL Released Plots", 20, nextY + 15)
  doc.text("- Modern Development: Tar Roads, Storm Water Drains, Water & Electricity Supply", 20, nextY + 22)
  doc.text("- Up to 90% Bank Finance Available from Nationalised Banks", 20, nextY + 29)
  doc.text("- Open Space, Utility Areas, Public Gardens & Children's Play Areas", 20, nextY + 36)
  doc.text("- Prime Growth Locations with Outstanding Investment Appreciation", 20, nextY + 43)

  // 8. Footer (Helpline info)
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 277, 210, 20, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("Inquiries Helpline: +91 89995 37942", 15, 287)
  doc.text("Office: Mahalaxmi Developers, Nagpur", 195, 287, { align: "right" })

  // Save the brochure
  const fileName = `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-brochure.pdf`
  doc.save(fileName)
}
