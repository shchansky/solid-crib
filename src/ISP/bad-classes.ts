// ❌ ПЛОХО: Нарушение ISP - толстый интерфейс, который заставляет классы реализовывать ненужные методы
//
// 1. ❌ КЛИЕНТЫ ЗАВИСЯТ ОТ МЕТОДОВ, КОТОРЫЕ НЕ ИСПОЛЬЗУЮТ
//    - Circle вынужден реализовывать getDiagonal(), который ему не нужен
//    - Rectangle вынужден реализовывать getDiameter(), который ему не нужен
//
// 2. ❌ ТОЛСТЫЙ УНИВЕРСАЛЬНЫЙ ИНТЕРФЕЙС
//    - Один интерфейс пытается покрыть все возможные методы
//    - Нарушение принципа единственной ответственности
//
// 3. ❌ ПРИНУДИТЕЛЬНАЯ РЕАЛИЗАЦИЯ НЕНУЖНЫХ МЕТОДОВ
//    - Классы должны реализовывать методы, которые не имеют смысла
//    - Возвращают бессмысленные значения (0, null, undefined)

interface Shape {
  getArea(): number;
  getPerimeter(): number;
  getInfo(): string;

  // ❌ ПРОБЛЕМА: Метод подходит только для круга
  getDiameter(): number;

  // ❌ ПРОБЛЕМА: Метод подходит только для прямоугольника
  getDiagonal(): number;
}

// ❌ НАРУШЕНИЕ ISP: Круг вынужден реализовывать ненужные методы
// 💡 ЧТО НЕ ТАК: Circle должен реализовывать getDiagonal(), который ему не нужен
// 🎯 РЕЗУЛЬТАТ: Возвращает бессмысленное значение 0
class Circle implements Shape {
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
    return this.radius * 2;
  }

  // ❌ НАРУШЕНИЕ ISP: Круг не может правильно реализовать этот метод, который ему не нужен
  // 💡 ЧТО НЕ ТАК: Возвращает бессмысленное значение
  // 🎯 РЕЗУЛЬТАТ: Нарушение принципа подстановки Лисков
  getDiagonal() {
    return 0; // ❌ Бессмысленное значение для круга
  }
}

// ❌ ПРОБЛЕМА: Прямоугольник тоже должен реализовывать ненужные методы
// 💡 ЧТО НЕ ТАК: Rectangle должен реализовывать getDiameter(), который ему не нужен
// 🎯 РЕЗУЛЬТАТ: Возвращает бессмысленное значение 0
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  getInfo(): string {
    return `Rectangle: ${this.width}x${this.height}`;
  }

  // ❌ НАРУШЕНИЕ ISP: Прямоугольник не может правильно реализовать этот метод, который ему не нужен
  // 💡 ЧТО НЕ ТАК: Возвращает бессмысленное значение
  // 🎯 РЕЗУЛЬТАТ: Нарушение принципа подстановки Лисков
  getDiameter() {
    return 0; // ❌ Бессмысленное значение для прямоугольника
  }

  getDiagonal() {
    return Math.sqrt(this.width * this.width + this.height * this.height);
  }
}

// ❌ НАРУШЕНИЕ ISP: Фабрика создает объекты с ненужными полями
// 💡 ЧТО НЕ ТАК: Каждый объект содержит поля, которые ему не нужны
// 🎯 РЕЗУЛЬТАТ: Избыточность данных и путаница
class CreateShapeFactory {
  // Фабричная функция для круга
  static circle(radius: number) {
    const circle = new Circle(radius);
    return {
      area: circle.getArea(),
      perimeter: circle.getPerimeter(),
      info: circle.getInfo(),
      diameter: circle.getDiameter(),
      diagonal: circle.getDiagonal(), // ❌ Ненужное поле для круга
    };
  }

  // Фабричная функция для прямоугольника
  static rectangle(width: number, height: number) {
    const rectangle = new Rectangle(width, height);
    return {
      area: rectangle.getArea(),
      perimeter: rectangle.getPerimeter(),
      info: rectangle.getInfo(),
      diameter: rectangle.getDiameter(), // ❌ Ненужное поле для прямоугольника
      diagonal: rectangle.getDiagonal(),
    };
  }
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Избыточность данных
// 💡 ЧТО НЕ ТАК: Объекты содержат ненужные поля
// 🎯 РЕЗУЛЬТАТ: Путаница и избыточность
const circleData = CreateShapeFactory.circle(10);
const rectangleData = CreateShapeFactory.rectangle(4, 6);

// ❌ ПРОБЛЕМА: Нельзя легко определить, какие поля действительно нужны
console.log(circleData.diagonal); // 0 - бессмысленное значение
console.log(rectangleData.diameter); // 0 - бессмысленное значение

export {};
