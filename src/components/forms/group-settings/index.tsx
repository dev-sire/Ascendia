"use client"
import GroupCard from "@/app/(discover)/explore/_components/group-cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGroupSettings } from "@/hooks/groups";

type Props = {
    groupId: string;
}

const GroupSettingsForm = ({ groupId }: Props) => {

    const {
        data,
        register,
        errors,
        onUpdate,
        isPending,
        previewIcon,
        previewThumbnail,
        onJsonDescription,
        setJsonDescription,
        onDescription,
        setOnDescription,
    } = useGroupSettings(groupId);

    return (
        <form
            className="flex flex-col h-full w-full items-start gap-y-5"
            onSubmit={onUpdate}
        >
            <div className="flex 2xl:flex-row flex-col gap-10">
                <div className="flex flex-col gap-3 items-start">
                    <p>Group Preview</p>
                    <GroupCard 
                        id={data?.group?.id!}
                        createdAt={data?.group?.createdAt!}
                        userId={data?.group?.userId!}
                        category={data?.group?.category!}
                        description={data?.group?.description!}
                        privacy={data?.group?.privacy!}
                        thumbnail={data?.group?.thumbnail!}
                        name={data?.group?.name!}
                        preview={previewThumbnail}
                    />
                    <Label
                        htmlFor="thumbnail-upload"
                        className="border-2 border-themeGray bg-themeGray/50 px-5 py-3 rounded-lg hover:bg-themeBlack cursor-pointer"
                    >
                        <Input 
                            type="file"
                            id="thumbnail-upload"
                            className="hidden"
                            {...register("thumbnail")}
                        />
                        Change Cover
                    </Label>
                </div>
            </div>
        </form>
    )
}

export default GroupSettingsForm;