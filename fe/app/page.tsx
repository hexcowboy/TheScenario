import { DataProvider } from "@/components/data-context";
import DataCreate from "@/components/data-create";
import DataList from "@/components/data-list";

export const metadata = {
  title: "Data List",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-12 sm:p-24">
      <DataProvider>
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Data List</h1>
          <DataCreate />
        </div>
        <DataList />
      </DataProvider>
    </main>
  );
}
