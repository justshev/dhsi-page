import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface FullDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FullDescriptionField({
  value,
  onChange,
}: FullDescriptionFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="fullDescription">Deskripsi Lengkap</Label>
      <Textarea
        id="fullDescription"
        placeholder="Penjelasan detail tentang kursus, tujuan pembelajaran, dan manfaat yang akan didapat"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
      />
    </div>
  );
}
