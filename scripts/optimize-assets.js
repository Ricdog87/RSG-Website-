// Dieses Script wird während des Build-Prozesses ausgeführt
// Es optimiert JavaScript- und CSS-Dateien

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Pfade zu den zu optimierenden Verzeichnissen
const PUBLIC_DIR = path.join(process.cwd(), "public")
const COMPONENTS_DIR = path.join(process.cwd(), "components")
const APP_DIR = path.join(process.cwd(), "app")

// Funktion zum Konvertieren von Bildern in WebP
function convertImagesToWebP() {
  console.log("🖼️ Konvertiere Bilder in WebP-Format...")

  // Suche nach allen Bildern im public/images Verzeichnis
  const imagesDir = path.join(PUBLIC_DIR, "images")

  if (!fs.existsSync(imagesDir)) {
    console.log("⚠️ Verzeichnis public/images nicht gefunden")
    return
  }

  const imageFiles = fs.readdirSync(imagesDir).filter((file) => /\.(jpe?g|png)$/i.test(file))

  if (imageFiles.length === 0) {
    console.log("ℹ️ Keine Bilder zum Konvertieren gefunden")
    return
  }

  // Installiere sharp, falls noch nicht vorhanden
  try {
    execSync("npm list sharp || npm install sharp --no-save", { stdio: "inherit" })
    const sharp = require("sharp")

    // Konvertiere jedes Bild
    imageFiles.forEach((file) => {
      const inputPath = path.join(imagesDir, file)
      const outputPath = path.join(imagesDir, file.replace(/\.(jpe?g|png)$/i, ".webp"))

      sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath)
        .then(() => console.log(`✅ Konvertiert: ${file} -> ${file.replace(/\.(jpe?g|png)$/i, ".webp")}`))
        .catch((err) => console.error(`❌ Fehler beim Konvertieren von ${file}:`, err))
    })
  } catch (error) {
    console.error("❌ Fehler bei der Bildkonvertierung:", error)
  }
}

// Funktion zum Minifizieren von CSS
function minifyCSS() {
  console.log("🎨 Optimiere CSS-Dateien...")

  try {
    // Installiere csso, falls noch nicht vorhanden
    execSync("npm list csso || npm install csso --no-save", { stdio: "inherit" })
    const csso = require("csso")

    // Optimiere globals.css
    const globalCssPath = path.join(APP_DIR, "globals.css")
    if (fs.existsSync(globalCssPath)) {
      const css = fs.readFileSync(globalCssPath, "utf8")
      const minified = csso.minify(css).css
      fs.writeFileSync(globalCssPath, minified)
      console.log(`✅ CSS optimiert: globals.css (${css.length} -> ${minified.length} Bytes)`)
    }
  } catch (error) {
    console.error("❌ Fehler bei der CSS-Optimierung:", error)
  }
}

// Hauptfunktion
function optimizeAssets() {
  console.log("🚀 Starte Asset-Optimierung...")

  // Führe alle Optimierungen durch
  convertImagesToWebP()
  minifyCSS()

  console.log("✨ Asset-Optimierung abgeschlossen!")
}

// Führe die Optimierung aus
optimizeAssets()
