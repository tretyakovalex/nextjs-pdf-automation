"use client"

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const defaultErrorState = {
    title: "",
    htmlFile: "",
    cssFile: ""
};

export default function CreateAutomation() {

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const pdfAutomation = useMutation(api.pdfAutomations.createPDFAutomation);
    const [htmlFile, sethtmlFile] = useState("");
    const [cssFile, setcssFile] = useState("");
    const [errors, setErrors] = useState(defaultErrorState);
    const { toast } = useToast();
    const router = useRouter();

    return (
        <div className="mt-8">
            <h1 className="text-4xl font-bold mb-8">Create a PDF Automation</h1>

            <p className="text-lg max-w-md mb-8">
                Create a new PDF automation by uploading your html and css files.
                Using these files a PDF will be generated and stored in your account.
            </p>

            <form 
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const title = formData.get("title") as string;

                    let newErrors = {
                        ...defaultErrorState,
                    };

                    if (!title) {
                        newErrors = {
                          ...newErrors,
                          title: "please fill in this required field",
                        };
                    }

                    if(!htmlFile){
                        newErrors = {
                            ...newErrors,
                            htmlFile: "please fill in this required field",
                        };
                    }

                    if(!cssFile){
                        newErrors = {
                            ...newErrors,
                            cssFile: "please fill in this required field",
                        };
                    }

                    setErrors(newErrors);
                    const hasErrors = Object.values(newErrors).some(Boolean);

                    if (hasErrors) {
                        toast({
                          title: "Form Errors",
                          description: "Please fill fields on the page",
                          variant: "destructive",
                        });
                        return;
                    }



                    const pdfAutomationId = await pdfAutomation({
                        htmlUrl: htmlFile,
                        cssUrl: cssFile,
                        title: title
                    });
            
                    router.push(`/pdfAutomations/${pdfAutomationId}`);
                }}  
            >
                <div className="flex flex-col gap-4 mb-8">
                    <Label htmlFor="title">PDF automation title</Label>
                    <Input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Put your pdf automation title"
                        className={clsx({
                            border: errors.title,
                            "border-red-500": errors.title,
                        })}
                    />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div
                        className={clsx("flex flex-col gap-4 rounded p-2", {
                        border: errors.htmlFile,
                        "border-red-500": errors.htmlFile,
                        })}
                    >
                        <h2 className="text-2xl font-bold">HTML File</h2>

                        {htmlFile}

                        <UploadButton
                        uploadUrl={generateUploadUrl}
                        fileTypes={["text/html"]} 
                        onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                            sethtmlFile((uploaded[0].response as any).storageId);
                        }}
                        onUploadError={(error: unknown) => {
                            alert(`ERROR! ${error}`);
                        }}
                        />

                        {errors.htmlFile && (
                        <div className="text-red-500">{errors.htmlFile}</div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div
                        className={clsx("flex flex-col gap-4 rounded p-2", {
                        border: errors.cssFile,
                        "border-red-500": errors.cssFile,
                        })}
                    >
                        <h2 className="text-2xl font-bold">CSS File</h2>

                        {cssFile} 

                        <UploadButton
                            uploadUrl={generateUploadUrl}
                            fileTypes={["text/css"]}
                            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                                setcssFile((uploaded[0].response as any).storageId);
                            }}
                            onUploadError={(error: unknown) => {
                                alert(`ERROR! ${error}`);
                            }}
                        />

                        {errors.cssFile && (
                        <div className="text-red-500">{errors.cssFile}</div>
                        )}
                    </div>
                </div>

                <Button>Generate PDF</Button>
            </form>
        </div>
    );
}