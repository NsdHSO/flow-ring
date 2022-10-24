"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterLabel = void 0;
var typeorm_1 = require("typeorm");
var inbox_1 = require("./inbox");
var FilterLabel = /** @class */ (function () {
    function FilterLabel() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], FilterLabel.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], FilterLabel.prototype, "filterPrimary", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], FilterLabel.prototype, "filterSocial", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], FilterLabel.prototype, "filterWork", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], FilterLabel.prototype, "filterFriends", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], FilterLabel.prototype, "newLabel", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return inbox_1.Inbox; }, function (inbox) { return inbox.filterLabel; }),
        __metadata("design:type", Array)
    ], FilterLabel.prototype, "filtersLabel", void 0);
    FilterLabel = __decorate([
        (0, typeorm_1.Entity)()
    ], FilterLabel);
    return FilterLabel;
}());
exports.FilterLabel = FilterLabel;
//# sourceMappingURL=label.js.map