// ✅ ХОРОШО: Соблюдение DIP - классы зависят от абстракций, а не от конкретных реализаций
//
// 1. ✅ ВЫСОКОУРОВНЕВЫЕ ПРОГРАММНЫЕ СУЩНОСТИ НЕ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - GoodShapeCalculator зависит от интерфейса Shape (абстракция)
//    - НЕ зависит от конкретных классов Circle, Rectangle
//
// 2. ✅ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые программные сущности: GoodShapeCalculator зависит от Shape
//    - Низкоуровневые программные сущности: Circle, Rectangle реализуют Shape
//
// 3. ✅ АБСТРАКЦИИ НЕ ЗАВИСЯТ ОТ ДЕТАЛЕЙ
//    - Интерфейс Shape не знает о конкретных реализациях
//    - Абстракция стабильна и редко изменяется
//
// 4. ✅ ДЕТАЛИ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Circle и Rectangle реализуют интерфейс Shape
//    - Конкретные классы зависят от абстракции

// ✅ DIP: Абстракция (интерфейс) - высокоуровневые программные сущности зависят от неё
// 💡 ПРЕИМУЩЕСТВО: Интерфейс определяет контракт, но не знает о деталях реализации
// 🎯 РЕЗУЛЬТАТ: Стабильная абстракция, которая редко изменяется
interface Shape {
  getArea(): number;
  getInfo(): string;
}

// ✅ DIP: Конкретные реализации - низкоуровневые программные сущности реализуют абстракцию
// 💡 ПРЕИМУЩЕСТВО: Каждый класс реализует интерфейс Shape
// 🎯 РЕЗУЛЬТАТ: Все фигуры можно использовать одинаково через интерфейс
class Circle implements Shape {
  constructor(private radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getInfo(): string {
    return `Circle: radius=${this.radius}`;
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }

  getInfo(): string {
    return `Rectangle: ${this.width}x${this.height}`;
  }
}

// ✅ DIP: Высокоуровневая программная сущность зависит от абстракции
// 💡 ПРЕИМУЩЕСТВО: Класс не знает о конкретных типах фигур
// 🎯 РЕЗУЛЬТАТ: Можно работать с любыми объектами, реализующими Shape
class ShapeCalculator {
  // ✅ DIP: Зависимость от абстракции, а не от конкретных классов
  // 💡 ПРЕИМУЩЕСТВО: Зависимости передаются извне (инъекция зависимостей)
  // 🎯 РЕЗУЛЬТАТ: Легко тестировать с мок-объектами
  constructor(private shapes: Shape[]) {}

  // ✅ DIP: Метод работает с абстракцией Shape, а не с конкретными типами
  // 💡 ПРЕИМУЩЕСТВО: Полиморфизм - работает с любыми фигурами
  // 🎯 РЕЗУЛЬТАТ: Не нужно знать конкретный тип фигуры
  calculateAllAreas(): number[] {
    return this.shapes.map((shape) => shape.getArea());
  }

  findLargestShape(): Shape | null {
    if (this.shapes.length === 0) return null;

    return this.shapes.reduce((largest, current) => {
      return current.getArea() > largest.getArea() ? current : largest;
    });
  }

  // ✅ DIP: Легко добавить новые методы без изменения существующих
  // 💡 ПРЕИМУЩЕСТВО: Расширяемость без изменения кода
  // 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости соблюдается
  getTotalArea(): number {
    return this.shapes.reduce((total, shape) => total + shape.getArea(), 0);
  }
}

// ✅ ДЕМОНСТРАЦИЯ 1
// Создание фигур (лучше было бы сделать через DI контейнер)
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

// ✅ DIP: Высокоуровневая программная сущность работает с абстракциями
// 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретные типы
// 🎯 РЕЗУЛЬТАТ: Гибкость и расширяемость
const calculator = new ShapeCalculator([circle, rectangle]);

const largestShape = calculator.findLargestShape();

const areas = calculator.calculateAllAreas();

// ✅ ДЕМОНСТРАЦИЯ 2: Моки через инъекцию зависимостей
// 💡 ИДЕЯ: Передаем фейковую реализацию Shape без изменения кода калькулятора
// 🎯 РЕЗУЛЬТАТ: Легкость тестирования и изоляции
const mock: Shape = {
  getArea: () => 42,
  getInfo: () => "Mock",
};

const testCalculator = new ShapeCalculator([mock]);
testCalculator.calculateAllAreas();
testCalculator.getTotalArea();
testCalculator.findLargestShape();

export {};
