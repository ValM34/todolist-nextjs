'use client'
import Link from "next/link";

export default function EmptyTaskState() {
  return (
    <div>
      <div className="">
        Vous n&apos;avez pas encore créé de tâche liée au projet
        sélectionné. Il vous faut <b>créer une tâche</b>.
      </div>
      <Link
        href="/tasks/new"
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Cliquez ici pour ajouter une nouvelle tâche.
      </Link>
    </div>
  )
}
