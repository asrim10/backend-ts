enum CarType {
  Sedan,
  SUV,
  Truck,
  Coupe,
}

type CarModel = {
  name: string;
  description: string;
};

interface Car {
  make: string | number;
  model: CarModel;
  year: number;
  type: CarType;
  isElectric?: boolean | number | string;
}

let cars: Car[] = [
  {
    make: "Alto",
    model: {
      name: "Alto",
      description: "Desc",
    },
    year: 2000,
    type: CarType.SUV,
  },
  {
    make: "Benz",
    model: {
      name: "Benz",
      description: "Desc",
    },
    year: 2020,
    type: CarType.SUV,
  },
  {
    make: "Maruti",
    model: {
      name: "Maruti",
      description: "Desc",
    },
    year: 2025,
    type: CarType.SUV,
  },
];

const carsolderthan2015: Car[] = cars.filter((car) => car.year < 2015);
console.log(carsolderthan2015);
