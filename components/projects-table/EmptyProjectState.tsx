'use client'
import Link from "next/link";

export default function EmptyProjectState() {
    return (
      <div>
        <div className="">
          Chaque tâche est liée à un projet. Vous n&apos;avez pas encore
          créé de projet. Il vous faut créer un projet pour pouvoir
          ajouter des tâches.
        </div>
        <Link
          href="/projects/new"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Cliquez ici pour ajouter un nouveau projet.
        </Link>
      </div>
    )
  }