"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/Vallidation";
import { createPitch } from "@/lib/actions";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ Toast from Sonner

export default function StartupForm() {
  const [error, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("HELLO WORLD");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title")?.toString(),
        description: formData.get("desc")?.toString(),
        category: formData.get("category")?.toString(),
        link: formData.get("link")?.toString(),
        pitch,
      };

      // ✅ Zod validation
      await formSchema.parseAsync(formValues);

      // ✅ Create the startup
      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast.success("🚀 Startup submitted successfully!");
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as Record<string, string>);
        toast.error("❌ Validation failed. Please check your input.");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("⚠️ Something went wrong. Please try again.");
      return {
        ...prevState,
        error: "Unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>

      <div>
        <label htmlFor="desc" className="startup-form_label">Description</label>
        <Textarea
          id="desc"
          name="desc"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {error.desc && <p className="startup-form_error">{error.desc}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />
        {error.category && <p className="startup-form_error">{error.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">Image</label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {error.link && <p className="startup-form_error">{error.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your startup idea, mission, and uniqueness.",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Startup"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}
