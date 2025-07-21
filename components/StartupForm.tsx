"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/Vallidation";
import { z } from "zod";
// import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function StartupForm() {
  const [error, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("HELLO WORLD");
//   const { toast } = useToast();
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: formData) => {
    try {
      const formValues = {
        title: formData.get("title")?.toString(),
        description: formData.get("desc")?.toString(),
        category: formData.get("category")?.toString(),
        link: formData.get("link")?.toString(),
        pitch: pitch,
      };
      console.log(formValues)
    //   const result = await createPitch(prevState, formData, pitch);

    //   if (result.status == "SUCCESS") {
    //     toast({
    //       title: "Success",
    //       description: "Your startup pitch has been created successfully",
    //     });

    //     router.push(`/startup/${result._id}`);
    //   }

    //   return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        // toast({
        //   title: "Error",
        //   description: "Please check your inputs and try again",
        //   variant: "destructive",
        // });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
    //   toast({
    //     title: "Error",
    //     description: "An unexpected error has occurred",
    //     variant: "destructive",
    //   });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: " ",
    status: "INITAL",
  });

  return (
    <>
      <form action={formAction} className="startup-form">
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            placeholder="Startup Title"
          ></Input>

          {error.title && <p className="startup-form_error">{error.title}</p>}
        </div>
        <div>
          <label htmlFor="desc" className="startup-form_label">
            Description
          </label>
          <Textarea
            id="desc"
            name="desc"
            className="startup-form_textarea"
            required
            placeholder="Startup Description"
          ></Textarea>

          {error.description && (
            <p className="startup-form_error">{error.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input"
            required
            placeholder="Startup Category (Tech, Health, Education...) "
          ></Input>

          {error.category && (
            <p className="startup-form_error">{error.category}</p>
          )}
        </div>
        <div>
          <label htmlFor="link" className="startup-form_label">
            Image
          </label>
          <Input
            id="link"
            name="link"
            className="startup-form_input"
            required
            placeholder="Startup Image URL "
          ></Input>

          {error.link && <p className="startup-form_error">{error.link}</p>}
        </div>
        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Briefly describe your startup idea, its mission, and what makes it unique. This is your chance to make a great first impression on potential investors or users.",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
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
    </>
  );
}
