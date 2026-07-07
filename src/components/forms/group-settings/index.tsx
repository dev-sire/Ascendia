
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
        <div className="flex flex-col gap-5">
            Group Settings Form
        </div>
    )
}

export default GroupSettingsForm;