import { FC, useState } from "react";
import { IKegiatan } from "src/types";

import Layout from "src/components/layout";
import { ChangeEvent } from "react";
import TodoKegiatan from "src/components/todoKegiatan";

const ListKegiatan: FC = () => {
  const [kegiatan, setKegiatan] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<IKegiatan[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "kegiatan") {
      setKegiatan(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addKegiatan = (): void => {
    const newKegiatan = { namaKegiatan: kegiatan, deadline: deadline };
    setKegiatan([...todo, newKegiatan]);
  };
  return (
    <Layout>
      <div>
        <p></p>
        <input
          type="text"
          name="kegiatan"
          placeholder="Kegiatan..."
          value={kegiatan}
          onChange={handleChange}
        />
        <input
          type="number"
          value={deadline}
          name="deadline"
          onChange={handleChange}
          id=""
        />

        <button onClick={addKegiatan}>Tambah Kegiatan</button>
        <div>{kegiatan.map(() => (
          return <TodoKegiatan />
        ))}</div>
      </div>
    </Layout>
  );
};

export default ListKegiatan;
