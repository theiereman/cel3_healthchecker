import { Cel } from "../../interfaces/cel/cel.ts";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export const CelCard = ({ cel }: { cel?: Cel | undefined }) => {
  const [success, setSuccess] = useState(false);
  const { data, setData, put, post, reset, processing, errors } = useForm({
    id: cel?.id ?? 0,
    name: cel?.name ?? "",
    url: cel?.url ?? "",
  });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cel === undefined) {
      post("/admin/cels/", {
        onSuccess: () => {
          reset();
        },
      });
    } else {
      put(`/admin/cels/${cel.id}`, {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        },
      });
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <form onSubmit={submit} className="flex gap-2 items-center flex-1">
          <input
            type="text"
            className="rounded-lg"
            value={data.name}
            placeholder="Nom"
            onChange={(e) => setData("name", e.target.value)}
          />
          <input
            type="text"
            className="rounded-lg flex-1"
            placeholder="https://example.com"
            value={data.url}
            onChange={(e) => setData("url", e.target.value)}
          />
          <button
            type="submit"
            disabled={processing}
            className={`${cel === undefined ? "bg-green-500" : "bg-blue-500"} p-2 rounded-lg text-white`}
          >
            {cel === undefined ? "Ajouter" : "Mettre à jour"}{" "}
          </button>
        </form>
        {cel && (
          <Link
            href={`/admin/cels/${cel.id}`}
            method={"delete"}
            data={{ cel: { name: cel.name, url: cel.url } }}
            className="bg-red-500 p-2 rounded-lg text-white"
          >
            Supprimer
          </Link>
        )}
      </div>
      {success && <div className="text-green-500">CEL mis à jour</div>}
    </div>
  );
};
