// ✅ ХОРОШО: Соблюдение ISP - тонкие интерфейсы, которые содержат только нужные методы
//
// 1. ✅ КЛИЕНТЫ НЕ ЗАВИСЯТ ОТ МЕТОДОВ, КОТОРЫЕ НЕ ИСПОЛЬЗУЮТ
//    - Circle реализует только CircleShape с нужными методами
//    - Rectangle реализует только RectangleShape с нужными методами
//
// 2. ✅ ТОНКИЕ СПЕЦИАЛИЗИРОВАННЫЕ ИНТЕРФЕЙСЫ
//    - Каждый интерфейс отвечает за одну область
//    - Четкое разделение ответственности
//
// 3. ✅ ДОБРОВОЛЬНАЯ РЕАЛИЗАЦИЯ НУЖНЫХ МЕТОДОВ
//    - Классы реализуют только методы, которые имеют смысл
//    - Нет бессмысленных реализаций

// ✅ ISP: Базовый интерфейс для всех фигур - только основные методы
interface Shape {
  getArea(): number;
  getPerimeter(): number;
  getInfo(): string;
}

// ✅ ISP: Расширенный интерфейс для круга - только методы, специфичные для круга
// 💡 ПРЕИМУЩЕСТВО: Специализированный интерфейс с нужными методами
// 🎯 РЕЗУЛЬТАТ: Circle реализует только то, что ему нужно
interface CircleShape extends Shape {
  getDiameter(): number; // ✅ Только для круга
}

// ✅ ISP: Расширенный интерфейс для прямоугольника - только методы, специфичные для прямоугольника
// 💡 ПРЕИМУЩЕСТВО: Специализированный интерфейс с нужными методами
// 🎯 РЕЗУЛЬТАТ: Rectangle реализует только то, что ему нужно
interface RectangleShape extends Shape {
  getDiagonal(): number; // ✅ Только для прямоугольника
}

// ✅ ISP: Круг реализует только нужные интерфейсы
// 💡 ПРЕИМУЩЕСТВО: Не нужно реализовывать ненужные методы
// 🎯 РЕЗУЛЬТАТ: Чистая и понятная реализация
class Circle implements CircleShape {
  constructor(private radius: number) {}

  getArea() {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }

  getInfo(): string {
    return `Circle: radius=${this.radius}`;
  }

  getDiameter() {
    return this.radius * 2; // ✅ Осмысленная реализация для круга
  }
}

// ✅ ISP: Прямоугольник реализует только нужные интерфейсы
// 💡 ПРЕИМУЩЕСТВО: Не нужно реализовывать ненужные методы
// 🎯 РЕЗУЛЬТАТ: Чистая и понятная реализация
class Rectangle implements RectangleShape {
  constructor(private width: number, private height: number) {}

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }

  getInfo() {
    return `Rectangle: ${this.width}x${this.height}`;
  }

  getDiagonal() {
    return Math.sqrt(this.width * this.width + this.height * this.height); // ✅ Осмысленная реализация для прямоугольника
  }
}

// ✅ ISP: Фабричные функции создают объекты только с нужными методами
// 💡 ПРЕИМУЩЕСТВО: Каждый объект содержит только релевантные поля
// 🎯 РЕЗУЛЬТАТ: Нет избыточности данных
class CreateShapeFactory {
  static getCircleData(radius: number) {
    const circle = new Circle(radius);
    return {
      area: circle.getArea(),
      perimeter: circle.getPerimeter(),
      info: circle.getInfo(),
      diameter: circle.getDiameter(), // ✅ Только нужные поля для круга
    };
  }

  static getRectangleData(width: number, height: number) {
    const rectangle = new Rectangle(width, height);
    return {
      area: rectangle.getArea(),
      perimeter: rectangle.getPerimeter(),
      info: rectangle.getInfo(),
      diagonal: rectangle.getDiagonal(), // ✅ Только нужные поля для прямоугольника
    };
  }
}

// ✅ ДЕМОНСТРАЦИЯ: Нет избыточности данных
// 💡 ПРЕИМУЩЕСТВО: Каждый объект содержит только релевантные поля
// 🎯 РЕЗУЛЬТАТ: Четкая структура данных
const circleData = CreateShapeFactory.getCircleData(10);
const rectangleData = CreateShapeFactory.getRectangleData(4, 6);



export {};
