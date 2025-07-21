"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function StartupForm() {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("HELLO WORLD");
  const isPending=false

  return (
    <>
      <form action={() => {}} className="startup-form">
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
        <div data-color-mode='light'>
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor value={pitch} onChange={(value)=>setPitch(value as string)} id="pitch" preview="edit" height={300} style={{borderRadius:20,overflow:'hidden'}} textareaProps={{
            placeholder:"Briefly describe your startup idea, its mission, and what makes it unique. This is your chance to make a great first impression on potential investors or users."
          }} previewOptions={{
            disallowedElements:["style"]
          }} />

          {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
        </div>
        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
{
    isPending ? "Submitting..." : "Submit Startup"
}
<Send className='size-6 ml-2' />


        </Button>
      </form>
    </>
  );
}
