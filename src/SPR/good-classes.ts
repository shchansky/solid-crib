// ✅ ХОРОШО: Соблюдение SRP - каждый метод делает что-то одно
//
// 📋 ОСНОВНАЯ ИДЕЯ SRP:
// 1. ✅ ЕДИНСТВЕННАЯ ОТВЕТСТВЕННОСТЬ - каждый метод отвечает за одну задачу
// 2. ✅ ЧЕТКИЕ ГРАНИЦЫ - валидация, расчеты и координация разделены
// 3. ✅ ВЫСОКАЯ СВЯЗНОСТЬ - связанные методы находятся вместе
// 4. ✅ НИЗКАЯ СВЯЗАННОСТЬ - методы не зависят друг от друга
// 5. ✅ ПРОСТОТА ИЗМЕНЕНИЯ - изменение одного метода не влияет на другие
//
// ПРЕИМУЩЕСТВА:
// 1. Каждый метод делает только одну вещь
// 2. Легкость тестирования отдельных компонентов
// 3. Простота понимания и поддержки
// 4. Легкость изменения отдельных частей
// 5. Соблюдение принципа единственной ответственности

// ✅ SRP: Класс с четким разделением ответственностей
// 💡 ПРЕИМУЩЕСТВО: Каждый метод отвечает за одну конкретную задачу
// 🎯 РЕЗУЛЬТАТ: Легкость понимания и тестирования
class ShapeProcessor {
    radius?: number;
    width?: number;
    height?: number;

    constructor(radius?: number, width?: number, height?: number) {
        this.radius = radius;
        this.width = width;
        this.height = height;
    }

    // ✅ SRP: Только валидация круга
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - проверка валидности
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять
    private isValidCircle(): boolean {
        return !!this.radius && this.radius > 0;
    }

    // ✅ SRP: Только валидация прямоугольника
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - проверка валидности
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять
    private isValidRectangle(): boolean {
        return !!this.width  && !!this.height && 
               this.width > 0 && this.height > 0;
    }

    // ✅ SRP: Только расчет площади круга
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
    private calculateCircleArea(): number {

        if(!this.radius) {
            throw new Error('Invalid circle radius');
        }

        return Math.PI * this.radius * this.radius;
    }

    // ✅ SRP: Только расчет периметра круга
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
    private calculateCirclePerimeter(): number {

        if(!this.radius) {
            throw new Error('Invalid circle radius');
        }

        return 2 * Math.PI * this.radius;
    }

    // ✅ SRP: Только расчет площади прямоугольника
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
    private calculateRectangleArea(): number {
        return (this.width ?? 0) * (this.height ?? 0);
    }

    // ✅ SRP: Только расчет периметра прямоугольника
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - математический расчет
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать и изменять формулу
    private calculateRectanglePerimeter(): number {
        return 2 * ((this.width ?? 0) + (this.height ?? 0));
    }

    // ✅ SRP: Координатор для круга - только координация
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - координация валидации и расчетов
    // 🎯 РЕЗУЛЬТАТ: Четкая структура и легкое понимание
    public processCircle(): {area: number, perimeter: number} {
        if (!this.isValidCircle()) {
            throw new Error('Invalid circle radius');
        }

        return {area: this.calculateCircleArea() , perimeter: this.calculateCirclePerimeter()};        
    }

    // ✅ SRP: Координатор для прямоугольника - только координация
    // 💡 ПРЕИМУЩЕСТВО: Одна ответственность - координация валидации и расчетов
    // 🎯 РЕЗУЛЬТАТ: Четкая структура и легкое понимание
    public processRectangle(): {area: number, perimeter: number} {
        if (!this.isValidRectangle()) {
            throw new Error('Invalid rectangle dimensions');
        }

        return {area: this.calculateRectangleArea(), perimeter: this.calculateRectanglePerimeter()};        
    }
}

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Четкое разделение ответственностей
// 💡 ПРЕИМУЩЕСТВО: Каждый метод делает только одну вещь
// 🎯 РЕЗУЛЬТАТ: Легкость использования и понимания
const circleParams = new ShapeProcessor(5).processCircle();
const rectangleParams = new ShapeProcessor(undefined, 4, 6).processRectangle();

export {}