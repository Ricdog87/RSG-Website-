"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, CheckCircle, AlertCircle, Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface CVUploaderProps {
  onUpload: (file: File) => void
  isDisabled: boolean
}

export default function CVUploader({ onUpload, isDisabled }: CVUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    validateAndSetFile(droppedFile)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    // Reset error state
    setError(null)

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      setError("Nur PDF, Word oder Text-Dateien sind erlaubt")
      toast({
        title: "Ungültiges Dateiformat",
        description: "Bitte laden Sie eine PDF, Word oder Text-Datei hoch.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Die Datei darf maximal 10 MB groß sein")
      toast({
        title: "Datei zu groß",
        description: "Die maximale Dateigröße beträgt 10 MB.",
        variant: "destructive",
      })
      return
    }

    // Set file if validation passes
    setFile(file)

    // Show success toast
    toast({
      title: "Datei erfolgreich ausgewählt",
      description:
        "Ihr Lebenslauf wurde erfolgreich ausgewählt. Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.",
      variant: "default",
    })
  }

  const handleUpload = async () => {
    if (file) {
      if (isDisabled) {
        setError("Bitte akzeptieren Sie zuerst die Datenschutzerklärung")
        toast({
          title: "Datenschutzerklärung erforderlich",
          description: "Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.",
          variant: "destructive",
        })
        return
      }

      setIsUploading(true)
      try {
        onUpload(file)
        toast({
          title: "Upload erfolgreich",
          description: "Ihr Lebenslauf wurde erfolgreich hochgeladen.",
          variant: "default",
        })
      } catch (error) {
        console.error("Fehler beim Hochladen:", error)
        setError("Es ist ein Fehler beim Hochladen aufgetreten. Bitte versuchen Sie es erneut.")
        toast({
          title: "Upload fehlgeschlagen",
          description: "Es ist ein Fehler beim Hochladen aufgetreten. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
      }
    } else {
      toast({
        title: "Keine Datei ausgewählt",
        description: "Bitte wählen Sie zuerst eine Datei aus.",
        variant: "destructive",
      })
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging
            ? "border-cyan-500 bg-cyan-500/10"
            : file
              ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/10"
              : "border-white/30 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10"
        } transition-all duration-300`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        onClick={triggerFileInput}
        role="button"
        aria-label="Lebenslauf hochladen"
        tabIndex={0}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt"
          aria-label="Lebenslauf-Datei auswählen"
        />

        {file ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-white font-medium">{file.name}</p>
            <p className="text-white/60 text-sm">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split("/")[1].toUpperCase()}
            </p>
            <p className="text-green-400 text-sm mt-2">Datei erfolgreich ausgewählt</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
              <Upload className="h-8 w-8 text-cyan-400" />
            </div>
            <p className="text-white font-medium">Lebenslauf hier ablegen oder klicken zum Auswählen</p>
            <p className="text-white/60 text-sm">PDF, Word oder Text-Dateien bis 10 MB</p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {file && !error && (
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={!isDisabled}
              onCheckedChange={(checked) => onUpload === checked}
              className="mt-1 border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
            />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="privacy" className="text-sm font-medium leading-none cursor-pointer">
                Ich habe die <span className="text-cyan-400">Datenschutzerklärung</span> gelesen und akzeptiere sie
              </label>
              <p className="text-sm text-white/60">
                Ihre Daten werden gemäß unserer Datenschutzerklärung für die Analyse und Empfehlungsgenerierung
                verwendet.
              </p>
            </div>
          </div>

          <Button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            disabled={isDisabled || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Lebenslauf wird verarbeitet...
              </>
            ) : (
              <>
                <File className="mr-2 h-4 w-4" />
                Lebenslauf hochladen & Analyse starten
              </>
            )}
          </Button>

          {isDisabled && (
            <div className="flex items-center text-amber-400 text-sm p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
              Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren
            </div>
          )}
        </div>
      )}
    </div>
  )
}
